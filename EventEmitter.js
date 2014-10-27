function EventEmitter() {
		this.callbacks = {};
		if (!(this instanceof EventEmitter)) {
			return new EventEmitter()
		}
	}
	EventEmitter.prototype = {
		on : function(event, func) {
			if (!this.callbacks.hasOwnProperty(event)) {
				this.callbacks[event] = [];
			}
			this.callbacks[event].push({
				"func" : func
			});
			return this;
		},
		off : function(event, func) {
			if (typeof event === "undefined") {
				this.callbacks = {};
			}
			if (this.callbacks.hasOwnProperty(event)) {
				if (typeof func === "undefined") {
					delete this.callbacks[event];
				} else {
					var i = this.callbacks[event].map(function(e) {
						return e.func;
					}).indexOf(func);
					if (i > -1) {
						this.callbacks[event].splice(i, 1);
					}
				}
			}
			return this;
		},
		emit : function(event) {
			var args = Array.prototype.slice.call(arguments, 1);
			if (this.callbacks.hasOwnProperty(event)) {
				this.callbacks[event].forEach(function(fonc) {
					fonc.func.apply(null, args);
					if (!(typeof fonc.num === "undefined")) {
						if (fonc.num === 1) {
							this.off(event, fonc.func);
						} else {
							fonc.num--;
						}
					}
				});
			}
			return this;
		},
	
	time : function(event, num, func) {
			if (!this.callbacks.hasOwnProperty(event)) {
				this.callbacks[event] = [];
			}
			this.callbacks[event].push({
				"func" : func,
				"num" : num
			});
			return this;
		},
		once : function(event, func) {
			this.time(event, 1, func);
			return this;
		}
	}