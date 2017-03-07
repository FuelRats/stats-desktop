export default class {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  alterProperty (property, amount, direction) {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }

    if (direction === 'increase') {
      this[property] = this[property] + amount

    } else {
      this[property] = this[property] - amount
    }
  }

  alterHue (amount, direction) {
    this.alterProperty('hue', amount, direction)
  }

  alterLightness (amount, direction) {
    this.alterProperty('lightness', amount, direction)
  }

  alterOpacity (amount, direction) {
    this.alterProperty('opacity', amount, direction)
  }

  alterSaturation (amount, direction) {
    this.alterProperty('saturation', amount, direction)
  }

  constructor (hue, saturation, lightness, opacity = 1) {
    if (hue === undefined) {
      throw new Error('HSL requires a hue.')
    }

    if (saturation === undefined) {
      throw new Error('HSL requires a saturation.')
    }

    if (lightness === undefined) {
      throw new Error('HSL requires a lightness.')
    }

    this.hue = hue
    this.lightness = lightness
    this.opacity = opacity
    this.saturation = saturation
  }

  decreaseHue (amount) {
    this.alterHue(amount, 'decrease')
  }

  decreaseLightness (amount) {
    this.alterLightness(amount, 'decrease')
  }

  decreaseOpacity (amount) {
    this.alterOpacity(amount, 'decrease')
  }

  decreaseSaturation (amount) {
    this.alterSaturation(amount, 'decrease')
  }

  increaseHue (amount) {
    this.alterHue(amount, 'increase')
  }

  increaseLightness (amount) {
    this.alterLightness(amount, 'increase')
  }

  increaseOpacity (amount) {
    this.alterOpacity(amount, 'increase')
  }

  increaseSaturation (amount) {
    this.alterSaturation(amount, 'increase')
  }

  toHSL () {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
  }

  toHSLA () {
    return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get hue () {
    return this._hue || (this._hue = 0)
  }

  get lightness () {
    return this._lightness || (this._lightness = 0)
  }

  get opacity () {
    return this._opacity || (this._opacity = 1)
  }

  get saturation () {
    return this._saturation || (this._saturation = 0)
  }





  /***************************************************************************\
    Setters
  \***************************************************************************/

  set hue (value) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }

    if (value < 0 || value > 360) {
      throw new Error('Hue values must be greater than 0 and less than 360.')
    }

    this._hue = value
  }

  set lightness (value) {
    if (typeof value === 'string') {
      if (value.indexOf('%') !== -1) {
        value.replace('%', '')
      }

      value = parseInt(value)
    }

    if (value < 0 || value > 100) {
      throw new Error('Lightness values must be greater than 0 and less than 100.')
    }

    this._lightness = value
  }

  set opacity (value) {
    if (typeof value === 'string') {
      value = parseFloat(value)
    }

    if (value < 0 || value > 1) {
      throw new Error('Opacity values must be greater than 0 and less than 1.')
    }

    this._opacity = value
  }

  set saturation (value) {
    if (typeof value === 'string') {
      if (value.indexOf('%') !== -1) {
        value.replace('%', '')
      }

      value = parseInt(value)
    }

    if (value < 0 || value > 100) {
      throw new Error('Saturation values must be greater than 0 and less than 100.')
    }

    this._saturation = value
  }
}
