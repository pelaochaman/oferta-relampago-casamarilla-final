/* eslint-disable no-console */
import React, { Component, useMemo, useContext } from "react";
import { injectIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { MyComponentProps } from './typings/global'
import { Progress } from 'vtex.styleguide'
import axios from 'axios'
import { useMutation } from 'react-apollo'
import MUTATIONS_ADD from './query/addToCart.gql'
import { useQuery } from 'react-apollo'
import { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from "react-slick";
import QUERY_ORDERID from './query/orderId.gql'
import QUERY_TRAT from './query/collectionT.gql'
import { useLazyQuery } from 'react-apollo'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
import { Helmet } from 'vtex.render-runtime'
import { useRuntime } from 'vtex.render-runtime';
import QUERY_SETTINGS from './query/settings.gql'
import { canUseDOM } from 'vtex.render-runtime'
import moment from 'moment';//https://momentjs.com/docs/

import ProductContext from './context/ProductContext';

const CSS_HANDLES = [
  'countdownheader',
  'countdownbody',
  'days',
  'hours',
  'minutes',
  'seconds',
  'daystext',
  'hourstext',
  'minutestext',
  'secondstext',
  'daysnum',
  'hoursnum',
  'minutesnum',
  'secondsnum',
  'message',
  'outlinecountdown',
  'separatorone',
  'separatortwo',
  'separatorthree',
  'title',
  'ofertaContainer',
  'ofertaHeader',
  'botonVariantMobile',
  'ofertaBody',
  'containerProducto',
  'contenedorProducto',
  'contenedorVariants',
  'containerVariants',
  'tituloVariants',
  'variants',
  'containerPrecios',
  'imagen',
  'imagen_img',
  'contenido',
  'nombre',
  'precio',
  'precioReal',
  'rowLeft',
  'verTodo',
  'imgCronometro',
  'rowRight',
  'botonComprar',
  'sliderImage',
  'fuego',
  'imgFuego',
  'separador',
  'descuento',
  'headerRowRight',

  'tituloOfertaRelampago',
  'spanTituloOfertaRelampago',
  'imagenCyberDiv',
  'imgImagenCyberDiv'
]
const currency = function (number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(number);
};

const Countdown = ({ props }) => {
  const [itemID, setItemID] = useState(0);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [settingsP, setSettingsP] = useState({});
  const [hide, setHide] = useState("none");
  const [terminado, setTerminado] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let settings = {};
  const { setProducts, productContext } = useContext(ProductContext);
  var contexto = useContext(ProductContext);

  const count = useCssHandles(CSS_HANDLES)
  var id1 = new Number(props.idColect1);
  var id1S = String(id1);
  console.log("ID colec 1", parseInt(id1));
  

  useEffect(() => {
    setProducts(id1S);
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  if (width > 990) {
    console.log("+990")
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      accessibility: true,
      className: count.sliderImage
    };
  } else if (width <= 990 && width > 640) {
    console.log("entre 990 y 640")
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      accessibility: true,
      className: count.sliderImage
    };
  } else if (width <= 640) {
    console.log("-640")
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      accessibility: true,
      className: count.sliderImage
    };
  }

  var fechaFin = new Date(props.enddate1).getTime();
  var fechaIni = new Date(props.startdate1).getTime();
  console.log("fechaFin 1:", fechaFin);
  console.log("fecha Ini 1", fechaIni);
  var startDate = moment(fechaIni);
  var endDateF = moment(fechaFin).format('MMMM DD YYYY, h:mm:ss');
  console.log("fecha FIn formato 1", endDateF);
  var endDate = moment(fechaFin);
  var horaF = endDate.format('MMMM DD YYYY, HH:mm:ss');
  var horaA = moment().format();
  var diferencia = parseInt(startDate.diff(horaA));

  function contador() {
    var fechaFinCif = new Date(horaF).getTime();

    var fechaIniCif = new Date(endDateF).getTime();
    var x = setInterval(function () {
      var fechaActCif = new Date().getTime();
      var auxDif = fechaIniCif - fechaActCif;
      var distance = fechaFinCif - fechaActCif;
      if (auxDif <= 0) {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hours").innerHTML = hours;

        document.getElementById("minutes").innerHTML = minutes;

        document.getElementById("seconds").innerHTML = seconds;
        if (hours == 0 && minutes == 0 && seconds == 0) {
          setTimeout(ocultarOferta, 1000);
        }
        if (distance < 0) {
          clearInterval(x);
          setHide("none");
        } else {
          setHide("block")
        }
      } else {
        console.log("AUN NO INICIA CONTADOR 1")
      }

    }, 1000);
  }
  function ocultarOferta() {
    setHide("none");
  }
  function mostrarOferta() {
    if (hide === "none" && terminado === false && horaF > horaA) {
      contador();
    }

  }
  if (diferencia) {
    setTimeout(mostrarOferta, diferencia);
  }
  var collect1 = parseInt(id1S);
  var url = "https://juliolab--kayserltda.myvtex.com/[" + collect1 + "]?map=productClusterIds";

  const { orderForm, setOrderForm } = useOrderForm()

  const addToCart = (itemID) => {
    let orderId = orderForm.id;
    let cuerpo = '{"orderItems":['
    cuerpo = cuerpo + '{"quantity":"1" ,"seller":"1","id":"' + itemID + '"}'
    cuerpo = cuerpo + ']}'

    fetch('/api/checkout/pub/orderForm/' + orderId + '/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: cuerpo,
    })
    window.location.reload();
  }
  console.log('contexto',contexto);
 

  return (
    <div className={`${count.ofertaContainer}`} style={{ display: hide }}>
      <Helmet>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Helmet>
      <div className={`${count.ofertaHeader}`}>
        <div id="countdown-header" className={`${count.countdownheader}`}>
        </div>
        <div id="countdown-body" className={`${count.countdownbody}`}>
          <div className={`${count.rowLeft}`}>
            <h2 className={`${count.title}`}>SOLO POR POCAS HORAS</h2>
            <a className={`${count.verTodo}`} href={url} target="_blank">ver todo</a>
            <img className={`${count.imgCronometro}`} src="https://cdn-icons-png.flaticon.com/512/6874/6874028.png" />
          </div>
          <div className={`${count.rowRight}`} id="outline-countdown">
            <div className={`${count.headerRowRight}`}>
              <div id="hours" className={`${count.hours}`}></div>
              <p className={`${count.separador}`}>:</p>
              <div id="minutes" className={`${count.minutes}`}></div>
              <p className={`${count.separador}`}>:</p>
              <div id="seconds" className={`${count.seconds}`}></div>
            </div>
          </div>
          <p id="message" className={`${count.message}`}></p>
        </div>
      </div>
      <div className={`${count.tituloOfertaRelampago}`}>
        <h2 className={`${count.spanTituloOfertaRelampago}`}>OFERTA RELAMPAGO</h2>
      </div>
      <div className={`${count.ofertaBody}`}>
        {
          productContext.length > 0 ? (
            <div className={`${count.containerProducto}`}>
              <Slider {...settings}>
                {
                  productContext.map((prod, index) => (
                    <div key={index} className={`${count.contenedorProducto}`} >
                      <div className={`${count.fuego}`}><img className={`${count.imgFuego}`} src="https://cdn-icons-png.flaticon.com/512/785/785116.png" /></div>
                      <a className={`${count.imagen}`} href={prod.link}>
                        <img className={`${count.imagen_img}`} src={prod.imagen} />
                      </a>
                      <div id={prod.sku} className={`${count.containerVariants}`} >
                        <div className={`${count.contenedorVariants}`}>
                           {prod.items.filter(cat => (cat.sellers[0].commertialOffer.AvailableQuantity > 0)).map((variant) =>
                            <div className={`${count.variants}`} onClick={() => setItemID(parseInt(variant.itemId))} ><img title={variant.Color+" "+variant.Potencia} className={`${count.imagen_img}`} src={variant.images[0].imageUrl} /></div>
                          )} 
                        </div>
                      </div>
                      <div className={`${count.contenido}`} id={"prodId" + prod.sku}>
                        <a className={`${count.nombre}`} href={prod.link}>
                          <p className={`${count.nombre}`} >{prod.nombre}</p>
                        </a>
                        <div className={`${count.containerPrecios}`}>
                          <p className={`${count.precioReal}`} >{currency(prod.precioReal)}</p>
                          <p className={`${count.precio}`} >{currency(prod.precio)}</p>
                          <p className={`${count.descuento}`} >{"-" + prod.desc + "%"}</p>
                        </div>
                      </div>
                      <button className={`${count.botonComprar}`} onClick={() => addToCart(itemID)}>Comprar</button>
                    </div>
                  ))
                }
              </Slider>
            </div>
          ) : (
            <h1>hola mundo!</h1>
          )
        }
      </div>
      <div className={`${count.imagenCyberDiv}`}>
        <img className={`${count.imgImagenCyberDiv}`} src="https://www.cyber.cl/images/logo_cyberday.svg"></img>
      </div>
    </div>
  );
}
export default Countdown