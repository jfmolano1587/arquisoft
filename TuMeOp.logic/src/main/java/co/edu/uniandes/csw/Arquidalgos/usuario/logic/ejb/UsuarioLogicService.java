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

package co.edu.uniandes.csw.Arquidalgos.usuario.logic.ejb;

import co.edu.uniandes.csw.Arquidalgos.usuario.logic.api.IUsuarioLogicService;
import co.edu.uniandes.csw.Arquidalgos.usuario.logic.dto.UsuarioAmigosDTO;
import co.edu.uniandes.csw.Arquidalgos.usuario.logic.dto.UsuarioBonosDTO;
import co.edu.uniandes.csw.Arquidalgos.usuario.logic.dto.UsuarioDTO;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless; 
import javax.enterprise.inject.Default;
import javax.inject.Inject;


@Default
@Stateless
@LocalBean
public class UsuarioLogicService extends _UsuarioLogicService implements IUsuarioLogicService {

    
    
    public List<UsuarioDTO> darAmigosUsuario(String facebookId){
        System.out.println("Dar amigos ejb de: "+facebookId);
        return persistance.darAmigosUsuario(facebookId);
    }
    
    public List<UsuarioDTO> agregarAmigos ( String facebookId, List<UsuarioDTO> amigos){
        
        return persistance.agregarAmigos(facebookId, amigos);
    }

    public List<UsuarioDTO> agregarAmigos(UsuarioAmigosDTO usuarioAmigos) {
        return agregarAmigos(usuarioAmigos.getFacebookId(),usuarioAmigos.getAmigos());
    }
    
    public void agregarBono(UsuarioBonosDTO usuarioBonos) {
        persistance.agregarBonos( usuarioBonos.getFacebookId(), usuarioBonos.getBonos());
    }

    

}