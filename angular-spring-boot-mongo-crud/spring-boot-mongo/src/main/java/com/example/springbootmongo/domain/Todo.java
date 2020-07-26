package com.example.springbootmongo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "todos")
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Todo {
    @Id
    private String id;

    @Indexed(unique = true)
    private String title;

    private Boolean completed = false;

    private Date createAt = new Date();

    public Todo() {
    }

    public Todo(String title, Boolean completed, Date createAt) {
        this.title = title;
        this.completed = completed;
        this.createAt = createAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", completed=" + completed +
                ", createAt=" + createAt +
                '}';
    }
}
