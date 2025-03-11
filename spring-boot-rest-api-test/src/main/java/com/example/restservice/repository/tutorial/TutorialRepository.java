package com.example.restservice.repository.tutorial;


import java.util.List;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restservice.models.tutorial.Tutorial;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TutorialRepository extends JpaRepository<Tutorial, Integer> , QuerydslPredicateExecutor<Tutorial> {


    List<Tutorial> findByTitleContaining(String title);
    List<Tutorial> findByPublished(boolean published);




}