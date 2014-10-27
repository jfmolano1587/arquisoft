/* ========================================================================
 * Copyright 2014 Arquidalgos
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 Arquidalgos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['controller/_usuarioController','delegate/usuarioDelegate', 'delegate/bonoDelegate' , 'model/bonoModel'], function() {
    App.Controller.UsuarioController = App.Controller._UsuarioController.extend({

        postInit: function(options) {
            var self = this;
            
            Backbone.on(this.componentId+'-loginFacebook', function(params) {
                self.permisosFacebook(params);
            });
            
            Backbone.on(this.componentId+'-renderRegistrarse', function(params) {
                self.renderRegistrarse(params);
            });
            Backbone.on(this.componentId+'-registrarse', function(params) {
                self.registrarse(params);
            });
            Backbone.on(this.componentId+'-importarAmigos', function(params) {
                self.importarAmigos(params);
            });
            Backbone.on(this.componentId+'-importarFacebook', function(params) {
                self.permisosFacebook(params);
                
//                self.importarFacebook(params);
            });
            Backbone.on(this.componentId+'-verAmigos', function(params) {
                self.verAmigos(params);
                
//                self.importarFacebook(params);
            });
            //Bonos Historial
            Backbone.on(this.componentId+'-verHistorialBonos', function(params) {
                self.verHistorialBonos();
                
                
            });
            
            Backbone.on(this.componentId+'-verAmigo', function(params) {
                console.log('ver amigo pos init params: '+JSON.stringify(params));
                self.verAmigo(params);
                
                
            });
            
            Backbone.on(this.componentId+'-agregarBono', function(params) { self.agregarBono(params); });
            
            this.importarAmigosTemplate = _.template($('#importarAmigos').html());
            this.principalTemplate = _.template($('#principal').html());
            this.registrarseTemplate = _.template($('#registrarse').html());
            this.amigosTemplate = _.template($('#amigos').html());
            this.likesTemplate = _.template($('#likesList').html());
            this.bonosTemplate = _.template($('#bonoList').html());
            
            
        },
        loginFacebook: function() {
            var self = this;
            console.log("component id1: "+this.componentId);
            var model = $('#' + this.componentId + '-FormLogin').serializeObject();
            console.log("Usuario Model log in: "+JSON.stringify(model));
            this.currentUsuarioModel = new App.Model.UsuarioModel();
            this.currentUsuarioModel.set(model);
            console.log("Usuario log in: "+JSON.stringify(this.currentUsuarioModel));
            self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
            var hash = CryptoJS.HmacSHA256(self.currentUsuarioModel, "123");
            console.log('SEGURIDAD HASH LOGIN DELEGATE: '+hash);
            self.usuarioDelegate.loginDelegate(
                self.currentUsuarioModel,
            
                function(data) {
                self.currentUsuarioModel=new App.Model.UsuarioModel(data);
                self.usuarioActual = self.currentUsuarioModel;
                //self._renderLogin();
                self.verAmigos();
//                self._renderEdit();
            }, 
            
            function(data) {
                Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                alert("Usuario o password invalidos");
            });
        },
        verAmigos: function() {
            var self = this;
            
            
            self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
            console.log('VerAmigos: Antes delegate: '+self.usuarioActual.toString()+" - "+JSON.stringify(self.usuarioActual));
            self.usuarioDelegate.verAmigosDelegate(
                self.usuarioActual,
            
                function(data) {
                console.log("Ver Amigos respuesta: "+JSON.stringify(data));
                self.currentAmigosUsuario=new App.Model.UsuarioList(data);
                
                //self._renderLogin();
                self.renderAmigos();
//                self._renderEdit();
                }, 
            
                function(data) {
                Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                alert("Error en ver los amigos");
                }
            );
        },
        registrarse: function() {
            var self = this;
            console.log("component id1: "+this.componentId);
            var model = $('#' + this.componentId + '-FormRegistrarse').serializeObject();
            console.log("Usuario Model log in: "+JSON.stringify(model));
            this.currentUsuarioModel = new App.Model.UsuarioModel();
            this.currentUsuarioModel.set(model);
            console.log("Usuario log in: "+JSON.stringify(this.currentUsuarioModel));
            self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
            self.usuarioDelegate.registrarseDelegate(
                self.currentUsuarioModel,
            
                function(data) {
                console.log("Registrarse respuesta: "+JSON.stringify(data));
                self.currentUsuarioModel=new App.Model.UsuarioModel(data);
                self.usuarioActual = self.currentUsuarioModel;
                //self._renderLogin();
                self.verAmigos();
//                self._renderEdit();
            }, 
            
            function(data) {
                Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                alert("Usuario o password invalidos");
            });
        },
        renderPrincipal: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.principalTemplate({usuarioActual: self.UsuarioActual, componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        renderAmigos: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                console.log("renderAmigos: "+JSON.stringify(self.currentAmigosUsuario));
                console.log("renderAmigos models: "+JSON.stringify(self.currentAmigosUsuario.models));
                self.$el.html(self.amigosTemplate({amigos: self.currentAmigosUsuario.models,usuarioActual: self.UsuarioActual, componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        renderLikes: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                
                console.log("renderAmigos models: "+JSON.stringify(self.likesAmigoActual.models));
                self.$el.html(self.likesTemplate({amigos: self.likesAmigoActual.models,usuarioActual: self.usuarioActual, componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        renderRegistrarse: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.registrarseTemplate({componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        importarAmigos: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.importarAmigosTemplate({usuarioId: self.usuarioActual.id ,componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        permisosFacebook: function(){
            var self = this;
            FB.login(function(response) {
                console.log('login - '+JSON.stringify(response));
                  
                
                FB.api('/me', function(response) {
                    console.log('Me :'+JSON.stringify(response));
                    
                     self.usuarioActual = new App.Model.UsuarioModel();
                                           
                        
                        self.usuarioActual.set('email',response.email);
                        self.usuarioActual.set('name',response.name);
                        self.usuarioActual.set('facebookId',response.id);
                        if ( response.id===10152697649964929)
                        {
                            FB.api('/me/feed', 'post', {message: 'http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.cosasdesalud.es%2Fimages%2Festre%25C3%25B1imiento.jpg&h=FAQEVwZDh\n\
                                                                                                                                        confieso que soy gay y estoy en el closet , ahora me ha comenzado a gustar mi mejor amigo de la u, ambos vamos al gym juntos y nos tocamos para "comparar musculos" y eso como que me calienta, bueno en fin no se si lanzarme o no, como dije estoy en el closet y mi amigo no tiene idea y yo tampoco se si tengo posibilodades o no :c, a pesar de estar en el closet tengo esperiencia homosexual,ya que varias veces en carretes y salidas se me han acercado tipos tirandome palos y como dije voy al gym y tengo buen físico así que algo debo llamar la atención y como no me hago de rogar mucho (en caso de encontrar a los tipos atractivos) he hecho de todo, y al otro día si te he visto no te acuerdo pero lo que quiero preguntar, todos estos weones con lo que he estado ellos se me han acercado a mi, como que algunos gay tienen un radar para encontrar otros gays aunque estos sean de los mas piolas, yo quiero saber ¿CÓMO SABER SI UN HOMBRE ES GAY O NO?, porque hay tipos cachan al tiro eso,yo a pesar de ser gay no logro distinguirlos!! por la chucha si alguen me enseña sería genial, para ver si le tiro los palos a mi amigo o no, o lo dejo como amigo no más .-., por fa ayudenme ustedes amigos heteros/homos como descubren a los gays quiero saber :s'});
                        }
                        
                        console.log('Usuario actual a registrar en el model: '+JSON.stringify(self.usuarioActual));
                        //TODO Registrar usuario en la aplicaci�n
                        self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
                        self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
                        console.log("Usuario JSON1: "+JSON.stringify(self.usuarioActual));
                        var hash = CryptoJS.HmacSHA256(JSON.stringify(self.usuarioActual), "123");
                        console.log("Usuario JSON2: "+JSON.stringify(self.usuarioActual));
                        console.log(typeof hash);
                        console.log('SEGURIDAD HASH: '+hash);
                        self.usuarioActual.set('hash',hash.toString());
                        self.usuarioDelegate.crearUsuarioDelegate(
                            self.usuarioActual,

                            function(data) {
                            console.log("Registrarse respuesta: "+JSON.stringify(data));
                            self.currentUsuarioModel=new App.Model.UsuarioModel(data);
                            self.usuarioActual.set('hash','');
                           self.agregarDatosFacebook(response);
                        }, 

                        function(data) {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                            alert("Error: "+JSON.stringify(data));
                        });
                        
                });
             
              
               
                 
             
                
                
                
                
            }, {scope: 'email,public_profile,user_friends,user_likes,publish_actions,read_stream'});
               
                       
        },
        verAmigo: function(response) {
            var self = this;
            console.log('ver amigo '+response.id);
            self.bonoNuevo = new App.Model.BonoModel();
            self.bonoNuevo.set('usuariobnId', response.id);
            self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
            
            FB.api('/'+response.id+'/likes', function (res){
                
                console.log('Res amigo: '+JSON.stringify(res));
                var likes = res.data;
                console.log('likes: '+JSON.stringify(response)+ ' - '+JSON.stringify(likes));
                if (likes){
                    
                    self.likesAmigo = new App.Model.TiendaList();
                    for( var i =0; i<likes.length; i++){
                        
                        var tiendaActual = new App.Model.TiendaModel();
                        console.log('Like actual: '+i+' '+JSON.stringify(likes[i]));
                        tiendaActual.set('facebookId', likes[i].id);
                         tiendaActual.set('name', likes[i].name);
                         
                         self.likesAmigo.models.push(tiendaActual);
                    }
                    self.usuarioDelegate.verLikesDelegate(
                    response.id, self.likesAmigo,

                    function(data) {
                        
                    console.log("Dato: "+JSON.stringify(data));
                    
                    
                    self.likesAmigoActual= new App.Model.TiendaList();
                    
                    for(var j = 0 ; j<data.length; j++){
                        
                        var likeModel = new App.Model.TiendaModel();
                        var likeActual = data[j];
                        console.log('like acutal '+JSON.stringify(likeActual));
                        likeModel.set('facebookId',likeActual.facebookId);
                        likeModel.set('name',likeActual.name);
                        likeModel.set('tipo',likeActual.tipo);
                        
                        self.likesAmigoActual.models.push(likeModel);
                        
                    }
                    //self.currentLikesUsuario=new App.Model.UsuarioList(data);

                    //self._renderLogin();
                    self.renderLikes();
    //                self._renderEdit();
                    }, 

                    function(data) {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                    alert("Error en ver los amigos");
                    }
                
                    );
                
                }
            });
            
            
        },
        agregarDatosFacebook: function (response){
             var self = this;
              
                
            FB.api('/me/friends', function(response) {
                    console.log('2');
                    if (response.data) {
                        console.log('3');
                         
                        console.log('Response'+JSON.stringify(response));
                        
                       
                        
                        var amigos = response.data;
                         var respuesta = '';
                         
                       self.amigosNuevos = new App.Model.UsuarioList ();
                         
                         
                        for (var i = 0; i < amigos.length; i++) {
                            console.log('i: '+i);
                            console.log('amigo all:'+JSON.stringify(amigos[i]));
                            console.log('amigo '+i+' - nombre:'+amigos[i].name);
                            FB.api("/"+amigos[i].id,function(res){
                                
                                console.log('Amigo con /{user-id} JSON: '+JSON.stringify(res));
                            });
//                            
//                            FB.api("/"+amigos[i].id+"/likes",function(res){
//                               
//                                console.log('Res amigo JSON:'+JSON.stringify(res));
//                            });
                            
                            var amigoActual = new App.Model.UsuarioModel();
                            
                            amigoActual.set('name', amigos[i].name);
                            amigoActual.set('email', amigos[i].email);
                            amigoActual.set('facebookId', amigos[i].id);
                           
                            self.amigosNuevos.models.push(amigoActual);
                        }
                        
                        self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
                        console.log('Usuario Actual facebook ID: '+self.usuarioActual.getDisplay('facebookId'));
                        self.usuarioDelegate.agregarAmigos(self.usuarioActual.getDisplay('facebookId'), self.amigosNuevos, function(data) {
                        

                            console.log("Amigos agregados: "+JSON.stringify(data));
                            console.log("Agreg� Amigos");
                            self.verAmigos();
                        }, function(data) {

                            alert("Error Agregando Amigos");
                        });
                        console.log('4');
                        
                    } else {
                        console.log('5');
                        console.log('Error al obtener amigos');
                    }
                });
            
        },
        statusChangeCallback: function (response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              testAPI();
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            }
        },

      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
        checkLoginState:function() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        },
        verHistorialBonos: function (){
            var self = this;
            self.bonoDelegate = new App.Delegate.BonoDelegate();
            self.bonoDelegate.verBonosDelegate(
                self.usuarioActual,
            
                function(data) {
                    console.log("Ver Historial Bonos respuesta: "+JSON.stringify(data));
                    self.currentBonos=new App.Model.BonoList(data);
                    self.renderHistorialBonos();
                }, 
            
                function(data) {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                    alert("Error en ver el historial de bonos");
                }
            );
        },
        renderHistorialBonos: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.bonosTemplate({bonos: self.currentBonos.models,usuarioActual: self.UsuarioActual, componentId: self.componentId}));
                self.$el.slideDown("fast");
            });
        },
        agregarBono: function(params){
            var self = this;
            var model = $('#' + this.componentId + '-bonoForm').serializeObject();
            
            console.log('agregar el bono: '+ JSON.stringify(model));
            self.bonoNuevo.set('valor', model.valor);
            self.bonoNuevo.set('tiendafId', params.tFb);
            
            self.bonosNuevos = new App.Model.BonoList ();
            self.bonosNuevos.models.push(self.bonoNuevo);
                            
                            
            self.usuarioDelegate = new App.Delegate.UsuarioDelegate();
            self.usuarioDelegate.agregarBonosDelegate(
                self.usuarioActual.getDisplay('facebookId'),
                self.bonosNuevos,
                function(data) {
                    console.log("Ver Bonos respuesta: "+JSON.stringify(data));
                    //Se debe tomar el resultado del  bono y mostrarlo en el alert
                    alert("Se ha enviado su bono a su amigo. Puede ver el bono comprado en el historial de bonos");
                    self.verHistorialBonos();
                },
                function(data) {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'cliente-login', view: self, id: '', data: data, error: 'No se pudo iniciar sesion'});
                    alert("Error en crear un bono ");
                }
            );
            
        }
      
    });
    return App.Controller.UsuarioController;
}); 