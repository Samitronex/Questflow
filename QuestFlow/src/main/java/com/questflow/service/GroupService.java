
package com.questflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.questflow.model.Group;
import com.questflow.repository.GroupRepository;

import jakarta.transaction.Transactional;  

@Service
public class GroupService {
  private final GroupRepository repo;
  public GroupService(GroupRepository repo) {
    this.repo = repo;
  }

  @Transactional(Transactional.TxType.SUPPORTS)  // readonly
  public List<Group> findAll() {
    return repo.findAll();
  }

  @Transactional
  public Group save(Group g) {
    return repo.save(g);
  }

  @Transactional
  public void delete(Integer id) {
    repo.deleteById(id);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public Group findById(Integer id) {
    return repo.findById(id)
               .orElseThrow(() -> new IllegalArgumentException("Grupo no encontrado"));
  }
}
