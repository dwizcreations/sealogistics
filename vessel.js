const VESSEL_TYPES = { 
    FISHINGBOAT:{ vesselCapacity:1, speed:1, armour:1 },
    SAILBOAT:{ vesselCapacity:5, speed:2, armour:2 }
 };

const map_vessel_capacity = 10;

class Vessel {
    constructor() {
        this.id   = "vessel_" + Math.floor(Math.random() * map_vessel_capacity);
        this.name = "Default Port Name";
        this.cssImageUrl = "assets/Untitled.png";
        this.coord = { "top": 0, "left": 0 };
        this.type = VESSEL_TYPES.SAILBOAT;
        this.storage = [];
        this.element = null;
        this.dockedPort = null;
        this.travelDirection = "right";
    }
    setName(name) {
        this.name = name;
        return this;
    }
    getName() {
        return this.name;
    }
    setCssImageUrl(cssImageUrl) {
        this.cssImageUrl = cssImageUrl;
        return this;
    }
    getCssImageUrl() {
        return this.cssImageUrl;
    }
    setCoord(top, left) {
        this.coord.top = top;
        this.coord.left = left;
        return this;
    }
    getCoord() {
        return this.coord;
    }
    setElement(element) {
        this.element = element;
        return this;
    }
    getElement() {
        return this.element;
    }

    findNearestPort( ports )
    {
      let closest = { abs:999999, port:null };

      for( var i = 0; i < ports.length; i++ )
      {
        let port = ports[i];

        if( !!this.dockedPort && this.dockedPort.id == port.id ) continue;

        if( !!this.previousPort && this.previousPort.id == port.id ) continue;

        let portAbs = Math.abs( this.coord.top - port.coord.top ) + Math.abs( this.coord.left - port.coord.left );

        //console.log( "port: ", port, " portAbs: ", portAbs, " closest: ", closest );

        if( portAbs < closest.abs )
        {
          closest.abs = portAbs;
          closest.port = port;
        }
      }

      return closest.port;
    }

    travel( port )
    {
        if( !port || !this.getElement() )
        {
            alert("invalid travel parameters");
            return;
        }

        if( !port.dockVessel( this ) );

        console.log("Vessel "+this.getName()+" was at ", ( !!this.previousPort ? this.previousPort.getName() : " n/a " ), " docked at: ", (!!this.dockedPort ? this.dockedPort.getName() : "nowhere"), " travelling to: ", port.getName()  );

        if( !!this.dockedPort ) this.dockedPort.departVessel( this );

        console.log("travelling to ", port.getName(), " from: ", (!!this.dockedPort ? this.dockedPort.getName() : "nowhere")  );

        this.previousPort = this.dockedPort;

        this.dockedPort = port;

        this.animate( port );

        this.coord = this.dockedPort.coord;

        return this;
    }

    animate( port )
    {
        console.log("[animate]ing from ", this.coord, " to: ", port.coord );

        let dataPath = utils.generateParthCoords( this.coord, port.coord );
        let svgPath  = d3.line()(dataPath);
        let travelDuration = utils.getTravelDuration( this.coord, port.coord );

        console.log("[animate]ing travelDuration ", travelDuration );

        //console.log( dataPath, svgPath );

        // Create new animation

        // Reset the animation
        this.getElement().style.animation = 'none';
        this.getElement().offsetHeight; /* trigger reflow */
        this.getElement().style.animation = '';

        utils.setVesselXDirection( this, port.coord );

        this.getElement().style.animationName = "move";
        this.getElement().style.animationDuration= travelDuration+"s";
        this.getElement().style.animationTimingFunction = "ease";
        this.getElement().style.animationDelay = "0s";
        this.getElement().style.animationDirection = "normal";
        this.getElement().style.animationIterationCount = "1";
        this.getElement().style.animationFillMode = "forwards";
        this.getElement().style.animationPlayState = "running";

        // Set the path
        this.getElement().style.offsetPath = "path('"+svgPath+"')";
        this.getElement().style.offsetRotate = "0deg";

        console.log("[animate] starting animate ", new Date().getTime() );

        //this.getElement().style.animation = 'none';

        setTimeout( function( vessel, destinationCoord )
        { 
            console.log("[stopTravelAnimation] stopping animate ", new Date().getTime(), " vessel: ", vessel.getName() );
            //vessel.stopTravelAnimation( destinationCoord );

        }, (travelDuration+0.001)*1000, ...[this, port.coord] );


        this.coord = port.coord; // Set the new coordinates to port's 
    }

}






