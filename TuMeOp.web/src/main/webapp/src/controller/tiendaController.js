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
define(['controller/_tiendaController','delegate/tiendaDelegate'], function() {
    App.Controller.TiendaController = App.Controller._TiendaController.extend({
         postInit: function(options) {
            var self = this;
            self.permisosFacebook();
            //this.importarAmigosTemplate = _.template($('#importarAmigos').html());
         },
         
         permisosFacebook: function(){
            var self = this;
            var tiempo = new Date().getTime();
            console.log('Hora: '+tiempo);
            FB.login(function(response) {
                console.log('login - '+JSON.stringify(response));
                  
                
                FB.api('/1481578408760798/likes', function(response) {
                    console.log('Me :'+JSON.stringify(response));
                    
                    self.tiendasNuevas = new App.Model.TiendaList ();
                    var tiendas = response.data;     
                        self.tiendaModelList = new App.Model.TiendaList ();
                        for (var i = 0; i < tiendas.length; i++) {
                            console.log('i: '+i);
                            console.log('amigo all:'+JSON.stringify(tiendas[i]));
                            
                           var tiendaActual = new App.Model.TiendaModel();
                           tiendaActual.set('facebookId', tiendas[i].id);
                           tiendaActual.set('name', tiendas[i].name);
                           tiendaActual.set('nombre', tiendas[i].name);
                           console.log('i: '+i+JSON.stringify(tiendaActual));
                           self.tiendasNuevas.models.push(tiendaActual);
                           self.tiendaModelList.models.push(tiendaActual);
                        }
                        
                        
                            self.tiendaDelegate = new App.Delegate.TiendaDelegate();
                            self.tiendaDelegate.agregarTiendas(
                                tiempo,
                                self.tiendasNuevas, 
                                function(data) {
                                    console.log(data.length !== 0);
                                    if (data.length !== 0)
                                    {
                                        self._renderList();
                                        console.log("Tienda agregada: "+JSON.stringify(data)+ data.length);
                                    }
                                    
                                    
                                }, 
                                function(data) {
                                alert("Error Agregando Amigos");
                                }
                            );
                        
                        
                        //location.reload();
               });
            }, {scope: 'email,public_profile,user_friends,user_likes,publish_actions,read_stream'});
               
                       
        }
    });
    return App.Controller.TiendaController;
}); 