(function () 
{
  let greetCount = 0;

  let ports = [];
  let vessels = [];
  
  function sayHi()
  {
    alert("hi");
  };

  function initVessels()
  {
    console.log("[initVessels] initialising");
    vessels.push( new Vessel().setName( "Athena" ).setCoord( 50, 50 ) );
    console.log("[initVessels] complete");
  }

  function renderVessels()
  {
    console.log("[renderVessels] initialising");

    let map = document.getElementsByTagName("map")[0];

    for( var i = 0; i < vessels.length; i++ )
    {
      let vessel = vessels[i];
      let el = document.createElement("boat");
      el.title = vessel.getName();
      el.style.backgroundImage = "url("+vessel.getCssImageUrl()+")";
      el.style.top = vessel.getCoord().top+"px";
      el.style.left = vessel.getCoord().left+"px";

      vessel.setElement( el );

      map.appendChild( el );
    }
    console.log("[renderVessels] complete");
  }

  function initPorts()
  {
    console.log("[initPorts] initialising");
    ports.push( new Port().setName( "Demios" ).setCoord( 220, 200 ).setCssImageUrl( "assets/port1.png" ) );
    ports.push( new Port().setName( "Phobos" ).setCoord( 870, 550 ).setCssImageUrl( "assets/port2.png" ) );
    ports.push( new Port().setName( "Ventos" ).setCoord( 100, 100 ).setCssImageUrl( "assets/port2.png" ) );
    ports.push( new Port().setName( "Xalidos" ).setCoord( 600, 400 ).setCssImageUrl( "assets/port1.png" ) );
    ports.push( new Port().setName( "Menos" ).setCoord( 700, 300 ).setCssImageUrl( "assets/port1.png" ) );
    ports.push( new Port().setName( "Vamanos" ).setCoord( 300, 500 ).setCssImageUrl( "assets/port2.png" ) );
    ports.push( new Port().setName( "Indignos" ).setCoord( 700, 900 ).setCssImageUrl( "assets/port2.png" ) );
    ports.push( new Port().setName( "Suenos" ).setCoord( 200, 800 ).setCssImageUrl( "assets/port1.png" ) );
    console.log("[initPorts] complete");
  }

  function renderPorts()
  {
    console.log("[renderPorts] initialising");

    let map = document.getElementsByTagName("map")[0];

    for( var i = 0; i < ports.length; i++ )
    {
      let port = ports[i];
      let el = document.createElement("port");
      el.title = port.getName();
      el.style.backgroundImage = "url("+port.getCssImageUrl()+")";
      el.style.top = port.getCoord().top+"px";
      el.style.left = port.getCoord().left+"px";

      port.setElement( el );

      map.appendChild( el );
    }
    console.log("[renderPorts] complete");
  }

  function navigate()
  {
    let vessel = vessels[0];

    let closestPort = vessel.findNearestPort( ports );

    console.log( "vessel: ", vessel.getName(), " nearestPort: ", closestPort.getName() );

    vessel.travel( closestPort );
  }

  function setup()
  {
    initPorts();
    renderPorts();
    initVessels();
    renderVessels();

    //setInterval( navigate, 4000 );
  }

  function debug_getVessel()
  {
    return vessels[0];
  }

  window.banana = { setup:setup, navigate:navigate, debug_getVessel:debug_getVessel };

  window.onload = function(){ setup(); }
})();