package com.example.springbootmongo.repository;

import com.example.springbootmongo.domain.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository<Todo,String> {
}
