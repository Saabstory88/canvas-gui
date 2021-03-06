/* General purpose class for drawable objects

  This original system does not allow for the properties of drawable objects to
  easily be swapped. Ultimately, this library is meant for creating user
  interfaces, so having easily switchable states is important.

  Additionally, geometry data needs to be made more generic

*/

class Drawable {
  constructor(ctx, options){
    this.type = "drawable";
    this.ctx = ctx;

    // This default will contain all of the possible style properties
    this.style = {
      fillStyle: '#000000',
      strokeStyle: '#FFFFFF',
      textColor: "#888",
      weight: '1px'
    }
    // This object will hold all of the possible styles
    this.styles = { default: this.style };

    // We are going to make geometry an object in itself
    this.geometry = {
      x: 0,
      y: 0
    }

    // We assign a root object for positioning
    this.root = {
      x: 0,
      y: 0
    }

    // Visibility, defaults to true
    this.visible = true;

    // Allow for child objects
    this.children = [];

    // Load the basic data about the object
    if(typeof(options) != 'undefined'){
      if(typeof(options.styles) != 'undefined'){
        this.styles = options.styles;
      } else {
        this.styles = {
          default: {
            fillStyle: '#000000',
            strokeStyle: '#FFFFFF',
            weight: '1px'
          }
        }
      }
      if(typeof(options.geometry) != 'undefined'){
        this.geometry = options.geometry;
      }
      if(typeof(options.root) != 'undefined'){
        this.root = options.root;
      }
      if(typeof(options.children) != 'undefined'){
        this.children = options.children;
        for(let i = 0; i < this.children.length; i++){
          this.children[i].root = this.root;
        }
      }
      this.setStyleDefaults();
    }
  }

  translateRoot(pos){
    this.root.x += pos.x;
    this.root.y += pos.y;
  }

  // Sets style by key
  setStyle(style){
    if(typeof(this.styles[style])!= 'undefined'){
      this.style = this.styles[style];
    }
    if(this.children.length > 0){
      for(let i = 0; i < this.children.length; i++){
        this.children[i].setStyle(style);
      }
    }
  }

  setStyleDefaults(){
    if(typeof(this.styles.default) != 'undefined'){
      this.setStyle('default');
    }
  }

  // Useful for getting the prototypical geometry for this type
  getGeometry(){
    return JSON.parse(JSON.stringify(this.geometry))
  }

  addChild(drawable){
    drawable.root = this.root;
    this.children.push(drawable);
  }

  drawChildren(){
    if(this.children.length > 0){
      for(let i = 0; i < this.children.length; i++){
        this.children[i].draw();
      }
    }
  }

  // The parent class method should always be called
  draw(){
    this.ctx.fillStyle = this.style.fillStyle;
    this.ctx.strokeStyle = this.style.strokeStyle;
    this.ctx.lineWidth = this.style.weight;
    this.ctx.moveTo(this.geometry.x + this.root.x, this.geometry.y + this.root.y);
  }
}

module.exports = Drawable;
