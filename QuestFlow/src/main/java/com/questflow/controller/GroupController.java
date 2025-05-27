
package com.questflow.controller;

import java.util.List;

import org.springframework.http.HttpStatus;        
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus; 
import org.springframework.web.bind.annotation.RestController;

import com.questflow.model.Group;
import com.questflow.service.GroupService;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
  private final GroupService service;
  public GroupController(GroupService service) {
    this.service = service;
  }

  @GetMapping
  public List<Group> list() {
    return service.findAll();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)  // devuelves 201 al crear
  public Group create(@RequestBody Group g) {
    return service.save(g);
  }

  @GetMapping("/{id}")
  public Group get(@PathVariable Integer id) {
    return service.findById(id);
  }

  @PutMapping("/{id}")
  public Group update(
    @PathVariable Integer id,
    @RequestBody Group cambios
  ) {
    Group g = service.findById(id);
    g.setName(cambios.getName());
    return service.save(g);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)  // 204 cuando borras
  public void delete(@PathVariable Integer id) {
    service.delete(id);
  }
}
