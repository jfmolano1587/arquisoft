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
package co.edu.uniandes.csw.Arquidalgos.bono.persistence;

import co.edu.uniandes.csw.Arquidalgos.bono.logic.dto.BonoDTO;
import co.edu.uniandes.csw.Arquidalgos.bono.persistence.api._IBonoPersistence;
import co.edu.uniandes.csw.Arquidalgos.bono.persistence.converter.BonoConverter;
import co.edu.uniandes.csw.Arquidalgos.bono.persistence.entity.BonoEntity;
import co.edu.uniandes.csw.Arquidalgos.tienda.persistence.TiendaPersistence;
import co.edu.uniandes.csw.Arquidalgos.usuario.persistence.UsuarioPersistence;
import co.edu.uniandes.csw.Arquidalgos.usuario.persistence.entity.UsuarioAmigoEntity;
import co.edu.uniandes.csw.Arquidalgos.usuario.persistence.entity.UsuarioEntity;
import java.util.List;
import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public abstract class _BonoPersistence implements _IBonoPersistence {

    @PersistenceContext(unitName = "TuMeOpPU")

    protected EntityManager entityManager;
    
    @EJB
    protected TiendaPersistence tP;
    
    public BonoDTO createBono(BonoDTO bono) {
        BonoEntity entity = BonoConverter.persistenceDTO2Entity(bono);
        entityManager.persist(entity);
        return BonoConverter.entity2PersistenceDTO(entity);
    }

    @SuppressWarnings("unchecked")
    public List<BonoDTO> getBonos() {
        UsuarioPersistence uP = new UsuarioPersistence();
        Query q = entityManager.createQuery("select u from BonoEntity u");
        return BonoConverter.entity2PersistenceDTOList(q.getResultList(), uP.getUsuarios(), tP.getTiendas());
    }

    public BonoDTO getBono(Long id) {
        return BonoConverter.entity2PersistenceDTO(entityManager.find(BonoEntity.class, id));
    }

    public void deleteBono(Long id) {
        BonoEntity entity = entityManager.find(BonoEntity.class, id);
        entityManager.remove(entity);
    }

    public void updateBono(BonoDTO detail) {
        BonoEntity entity = entityManager.merge(BonoConverter.persistenceDTO2Entity(detail));
        BonoConverter.entity2PersistenceDTO(entity);
    }

}
