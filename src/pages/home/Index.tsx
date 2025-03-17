import { Link } from "react-router-dom";
import handleScroll from "../../scroll";
import { useRef } from "react";

type Props = {};

function Index({}: Props) {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="z-10 h-16 bg-white w-screen border-b-[1px] flex fixed top-0 left-0 items-center justify-between px-[2.5%] overflow-hidden">
        <a href="" className="h-full ml-[2.5%]">
          <img
            src="/gestor-gastos/images/Imagologo.png"
            className="h-[70px] max-md:h-20"
          />
        </a>
        <nav className="mr-[2.5%] flex items-center justify-end gap-5">
          <a
            className="cursor-pointer relative transition-all duration-300 text-md after:content-[''] after:w-0 after:absolute after:top-full after:left-0 after:h-1 after:bg-primary after:rounded-lg after:transition-all after:duration-300 hover:after:w-full text-nowrap text-text hover:text-primary font-inter link__animation"
            onClick={() => handleScroll(section1Ref)}
          >
            Inicio
          </a>
          <a
            className="cursor-pointer relative transition-all duration-300 text-md after:content-[''] after:w-0 after:absolute after:top-full after:left-0 after:h-1 after:bg-primary after:rounded-lg after:transition-all after:duration-300 hover:after:w-full text-nowrap text-text hover:text-primary font-inter link__animation"
            onClick={() => handleScroll(section2Ref)}
          >
            Características
          </a>
          <a
            className="cursor-pointer relative transition-all duration-300 text-md after:content-[''] after:w-0 after:absolute after:top-full after:left-0 after:h-1 after:bg-primary after:rounded-lg after:transition-all after:duration-300 hover:after:w-full text-nowrap text-text hover:text-primary font-inter link__animation"
            onClick={() => handleScroll(section3Ref)}
          >
            Funcionamiento
          </a>
          <a
            className="cursor-pointer relative transition-all duration-300 text-md after:content-[''] after:w-0 after:absolute after:top-full after:left-0 after:h-1 after:bg-primary after:rounded-lg after:transition-all after:duration-300 hover:after:w-full text-nowrap text-text hover:text-primary font-inter link__animation"
            onClick={() => handleScroll(section4Ref)}
          >
            Sobre el proyecto
          </a>
          <Link
            className="flex px-3 py-2 text-white transition border-2 text-nowrap hover:text-primary rounded-xl bg-primary border-primary hover:bg-white"
            to="/dashboard/home"
          >
            Accede al Gestor
          </Link>
        </nav>
      </header>

      <main className="min-h-screen pt-16" ref={section1Ref}>
        <section className="w-full h-fit px-[5%]">
          <div className="hero__grid grid grid-cols-[5fr_4fr] gap-x-4">
            <div className="p-5">
              <span className="flex items-center gap-4 h-1/5">
                <img
                  src="/gestor-gastos/simbolo.png"
                  className="h-10"
                />
                <h1 className="text-4xl font-bold text-[#3bb371]">
                  planit
                  <span className="text-4xl font-extrabold text-[#04944f]">
                    Up
                  </span>
                </h1>
              </span>
              <h1 className="text-6xl font-bold leading-tight">
                Gestiona tus Finanzas <br /> de Forma Inteligente
              </h1>
              <p className="mt-4 text-xl text-gray-800">
                Controla tus ingresos y gastos con facilidad y mantén tus
                finanzas bajo control sin esfuerzo. Con nuestra plataforma
                intuitiva, podrás analizar tus hábitos de consumo, tomar mejores
                decisiones y alcanzar tus metas económicas de manera sencilla.
                ¡Empieza a organizar tu dinero como un profesional!
              </p>
              <div className="flex items-center gap-5 mt-5">
                <Link
                  className="flex py-2 text-xl font-semibold text-white transition border-2 rounded-md font-inter w-fit px-7 bg-primary border-primary hover:border-[#38613a] hover:bg-[#38613a]"
                  to="/gestor-gastos/dashboard/home/"
                >
                  Empezar ahora
                </Link>
                <a
                  className="flex py-2 text-xl font-semibold bg-white border-2 border-gray-300 rounded-md font-inter w-fit px-7 text-primary hover:border-primary transition-all duration-300 hover:bg-[#f8f8f8]"
                  href=""
                >
                  Contacta con nosotros
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center px-3">
              <video
                className="w-full rounded-lg bg-slate-200"
                src="/gestor-gastos/"
              ></video>
            </div>
          </div>
          <div className="flex items-center justify-center py-8">
            <a
              className="p-5 cursor-pointer hero__a w-fit h-fit link__animation"
              onClick={() => handleScroll(section2Ref)}
            >
              <i className="text-4xl fa-solid fa-arrow-down text-primary"></i>
            </a>
          </div>
        </section>

        <div className="w-full h-5 bg-white" ref={section2Ref}></div>

        <section className="px-6 py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Descubre todas las ventajas
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Administra tu dinero de forma fácil e inteligente con nuestras
              herramientas avanzadas.
            </p>
          </div>

          <div className="grid max-w-6xl gap-8 mx-auto mt-12 md:grid-cols-3 sm:grid-cols-2">
            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">✍️</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Registro Rápido de Transacciones
              </h3>
              <p className="mt-2 text-gray-600">
                Agrega tus ingresos y gastos en segundos con una interfaz
                sencilla y eficiente.
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Personalización Completa
              </h3>
              <p className="mt-2 text-gray-600">
                Configura colores, categorías y opciones para que el gestor se
                adapte a tu estilo.
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">💰</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Control de Presupuesto
              </h3>
              <p className="mt-2 text-gray-600">
                Configura límites de gasto y controla tu dinero sin esfuerzo.
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Seguridad y Privacidad
              </h3>
              <p className="mt-2 text-gray-600">
                Tus datos están protegidos con cifrado de nivel bancario.
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">📅</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Organización Automática
              </h3>
              <p className="mt-2 text-gray-600">
                Clasifica automáticamente tus gastos en categorías para un mejor
                control.
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md cursor-default caract-div">
              <div className="mb-4 text-5xl text-primary">📱</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Acceso Multiplataforma
              </h3>
              <p className="mt-2 text-gray-600">
                Usa el gestor desde tu computadora, tablet o móvil sin
                complicaciones.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-5 bg-white" ref={section3Ref}></div>

        <section className="flex flex-col items-center w-full py-16 h-fit">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Pasos para controlar nuestro gestor
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Descubre como de fácil es manejar tus transacciones con nuestra
              herramienta.
            </p>
          </div>

          <div className="grid max-md:gap-y-6 max-md:grid-rows-[250px_250px_250px] md:grid-rows-[250px] pt-10 max-md:grid-cols[300px] md:grid-cols-[300px_300px_300px] gap-x-6">
            <div className="col-grid transition-all duration-300 cursor-default gap-3 flex items-center justify-center flex-col rounded-lg shadow-md bg-[#ffcaf2] text-center">
              <h2 className="flex items-center h-10 text-2xl font-extrabold text-center">
                PASO 1
              </h2>
              <div className="mb-4 text-5xl text-primary">✍️</div>
              <p className="h-10 text-lg text-gray-600 balance">
                Añade tus transacciones
              </p>
            </div>
            <div className="text-center col-grid transition-all duration-300 cursor-default gap-3 flex items-center justify-center flex-col rounded-lg shadow-md bg-[#cafffe]">
              <h2 className="flex items-center h-10 text-2xl font-extrabold text-center">
                PASO 2
              </h2>
              <div className="mb-4 text-5xl text-primary">📊</div>
              <p className="h-10 text-lg text-gray-600 balance">
                Analiza tus finanzas con gráficos
              </p>
            </div>
            <div className="text-center col-grid transition-all duration-300 cursor-default gap-3 flex items-center justify-center flex-col rounded-lg shadow-md bg-[#ffcaca]">
              <h2 className="flex items-center h-10 text-2xl font-extrabold text-center">
                PASO 3
              </h2>
              <div className="mb-4 text-5xl text-primary">📥</div>
              <p className="h-10 text-lg text-gray-600 balance">
                Descarga tus datos o sigue tu progreso
              </p>
            </div>
          </div>
        </section>

        <div
          className="w-full h-5 bg-white border-b-[1px] border-gray-300 mb-10"
          ref={section4Ref}
        ></div>

        <section className="">
          <div className="text-center">
            <div className="flex items-center justify-center w-full h-16">
              <span className="text-5xl text-center text-primary">
                <i className="fa-solid fa-book-open-reader"></i>
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Acerca del proyecto
            </h2>
          </div>

          <div className="sobre__container h-fit">
            <div className="grid grid-cols-[1fr_1fr] grid-rows-[1fr] w-full h-fit gap-x-6 py-10 px-10">
              <div className="px-20 sobre__div">
                <p className="px-2 text-lg italic font-light text-justify border-l-8 border-primary">
                  Hemos creado este gestor financiero con el objetivo de
                  ofrecerte una solución fácil y accesible para administrar tu
                  dinero. Con nuestra plataforma, podrás registrar tus ingresos
                  y gastos, visualizar tendencias y tomar mejores decisiones
                  financieras. Ya seas un estudiante, un emprendedor o
                  simplemente alguien que quiere mejorar su economía personal,
                  este gestor es para ti.
                </p>
              </div>
              <div className="sobre__div">
                <h2 className="text-3xl font-bold text-gray-900">
                  Tecnologías utilizadas
                </h2>
                <div className="flex flex-wrap w-[85%] gap-4 py-3">
                  <div className="text-orange-300 border-2 border-orange-300 tecCard">
                    <i className="fa-brands fa-html5"></i>
                    <span>HTML5</span>
                  </div>
                  <div className="text-blue-400 border-2 border-blue-400 tecCard">
                    <i className="fa-brands fa-css3-alt"></i>
                    <span>CSS3</span>
                  </div>
                  <div className="text-yellow-400 border-2 border-yellow-400 tecCard">
                    <i className="fa-brands fa-js"></i>
                    <span>JavaScript</span>
                  </div>
                  <div className="text-blue-900 border-2 border-blue-900 tecCard">
                    <img
                      className=""
                      src="/gestor-gastos/images/typescript.svg"
                      alt=""
                    />
                    <span>TypeScript</span>
                  </div>
                  <div className="text-blue-600 border-2 border-blue-600 tecCard">
                    <i className="fa-brands fa-react"></i>
                    <span>React</span>
                  </div>
                  <div className="text-[#86ecce] border-2 border-[#86ecce] tecCard">
                    <img
                      className=""
                      src="/gestor-gastos/images/tailwind.svg"
                      alt=""
                    />
                    <span>TailwindCSS3</span>
                  </div>
                  <div className="text-[#aaa3f3] border-2 border-[#aaa3f3] tecCard">
                    <img
                      className="h-5"
                      src="/gestor-gastos/images/vite.svg"
                      alt=""
                    />
                    <span>Vite</span>
                  </div>
                  <div className="text-gray-700 border-2 border-gray-700 tecCard">
                    <i className="fa-brands fa-github"></i>
                    <span>Github</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Lo que dicen nuestros usuarios y cómo ha mejorado su vida
              financiera
            </h2>
            <div className="flex items-center justify-center gap-5 px-16 py-5 rese__container">
              <div className="box boxRes transition-all duration-300 rounded-[10px] m-w-[250px] w-[250px] h-[220px] text-center border border-gray-300 p-[10px] cursor-default">
                <div className="reseñaTop h-1/4 flex justify-between items-center gap-[2%]">
                  <img className="h-[49.6px] w-[49.6px] rounded-[50%]" src="/gestor-gastos/images/person.png" />
                  <div className="w-[73%] h-[49.6px]">
                    <h2 className="h-3/6 max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-text text-lg leading-[30px] m-0 p-0">MonicaTechie</h2>
                    <h3 className="star4 h-2/5 w-full text-[17px] text-left mt-[5px] before:hidden">
                      <i
                        className="fa-solid fa-star text-[#daa520]"
                        id="star1"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star2"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star3"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star4"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star5"
                        aria-hidden="true"
                      ></i>
                    </h3>
                  </div>
                </div>
                <div className="reseñaBottom h-[70%] text-left text-lg mt-[5%] pt-2.5">
                  La página tiene muy buenas descripciones de los productos, lo
                  que facilita la compra.
                </div>
              </div>
              <div className="box boxRes transition-all duration-300 rounded-[10px] m-w-[250px] w-[250px] h-[220px] text-center border border-gray-300 p-[10px] cursor-default">
                <div className="reseñaTop h-1/4 flex justify-between items-center gap-[2%]">
                  <img className="h-[49.6px] w-[49.6px] rounded-[50%]" src="/gestor-gastos/images/person.png" />
                  <div className="w-[73%] h-[49.6px]">
                    <h2 className="h-3/6 max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-text text-lg leading-[30px] m-0 p-0">MonicaTechie</h2>
                    <h3 className="star4 h-2/5 w-full text-[17px] text-left mt-[5px] before:hidden">
                      <i
                        className="fa-solid fa-star text-[#daa520]"
                        id="star1"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star2"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star3"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star4"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star5"
                        aria-hidden="true"
                      ></i>
                    </h3>
                  </div>
                </div>
                <div className="reseñaBottom h-[70%] text-left text-lg mt-[5%] pt-2.5">
                  La página tiene muy buenas descripciones de los productos, lo
                  que facilita la compra.
                </div>
              </div>
              <div className="box boxRes transition-all duration-300 rounded-[10px] m-w-[250px] w-[250px] h-[220px] text-center border border-gray-300 p-[10px] cursor-default">
                <div className="reseñaTop h-1/4 flex justify-between items-center gap-[2%]">
                  <img className="h-[49.6px] w-[49.6px] rounded-[50%]" src="/gestor-gastos/images/person.png" />
                  <div className="w-[73%] h-[49.6px]">
                    <h2 className="h-3/6 max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-text text-lg leading-[30px] m-0 p-0">MonicaTechie</h2>
                    <h3 className="star4 h-2/5 w-full text-[17px] text-left mt-[5px] before:hidden">
                      <i
                        className="fa-solid fa-star text-[#daa520]"
                        id="star1"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star2"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star3"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star4"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star5"
                        aria-hidden="true"
                      ></i>
                    </h3>
                  </div>
                </div>
                <div className="reseñaBottom h-[70%] text-left text-lg mt-[5%] pt-2.5">
                  La página tiene muy buenas descripciones de los productos, lo
                  que facilita la compra.
                </div>
              </div>
              <div className="box boxRes transition-all duration-300 rounded-[10px] m-w-[250px] w-[250px] h-[220px] text-center border border-gray-300 p-[10px] cursor-default">
                <div className="reseñaTop h-1/4 flex justify-between items-center gap-[2%]">
                  <img className="h-[49.6px] w-[49.6px] rounded-[50%]" src="/gestor-gastos/images/person.png" />
                  <div className="w-[73%] h-[49.6px]">
                    <h2 className="h-3/6 max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-text text-lg leading-[30px] m-0 p-0">MonicaTechie</h2>
                    <h3 className="star4 h-2/5 w-full text-[17px] text-left mt-[5px] before:hidden">
                      <i
                        className="fa-solid fa-star text-[#daa520]"
                        id="star1"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star2"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star3"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star4"
                        aria-hidden="true"
                      ></i>
                      <i
                        className="fa-solid fa-star"
                        id="star5"
                        aria-hidden="true"
                      ></i>
                    </h3>
                  </div>
                </div>
                <div className="reseñaBottom h-[70%] text-left text-lg mt-[5%] pt-2.5">
                  La página tiene muy buenas descripciones de los productos, lo
                  que facilita la compra.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#5fa062a4] h-[300px]"></footer>
    </>
  );
}

export default Index;
