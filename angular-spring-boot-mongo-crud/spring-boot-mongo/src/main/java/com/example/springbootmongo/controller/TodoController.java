package com.example.springbootmongo.controller;

import com.example.springbootmongo.domain.Todo;
import com.example.springbootmongo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAllTodos(){
//        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createAt");
//        return todoRepository.findAll(sortByCreatedAtDesc);
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo){
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id){
        return todoRepository.findById(id)
                .map(todo -> ResponseEntity.ok().body(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todo){
        return todoRepository.findById(id)
                .map( selectedTodo -> {
                    selectedTodo.setTitle(todo.getTitle());
                    selectedTodo.setCompleted(todo.getCompleted());
                    Todo updatedTodo = todoRepository.save(selectedTodo);
                    return ResponseEntity.ok().body(updatedTodo);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable String id){
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

}
