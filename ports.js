class Port {
    constructor() {
        this.id   = "port_" + Math.floor(Math.random() * map_vessel_capacity);
        this.name = "Default Port Name";
        this.cssImageUrl = "assets/port1.png";
        this.coord = { "top": 0, "left": 0 };
        this.vesselCapacity = 5;
        this.dockedVessels = [];
        this.storageCapacity = 50;
        this.storage = [];
        this.element = null;
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
    setVesselCapacity(vesselCapacity) {
        this.vesselCapacity = vesselCapacity;
        return this;
    }
    setStorageCapacity(storageCapacity) {
        this.storageCapacity = storageCapacity;
        return this;
    }
    setElement(element) {
        this.element = element;
        return this;
    }
    getElement() {
        return this.element;
    }

    dockVessel(vessel) {
        if (this.vesselCapacity = this.dockedVessels.length) {
            alert("Port " + this.name + " max capacity [" + this.vesselCapacity + "] reached");
            return false;
        }
        this.dockedVessels.push(vessel);
        
        return true;
    }
    departVessel(vessel) {
        //this.dockedVessels.remove(vessel);

        this.dockedVessels = this.dockedVessels.filter(item => item !== vessel)
        return this;
    }
}






