package com.example.restservice.repository.diet;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.repository.common.BaseRepositoryImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;

import java.util.List;


public class DietRepositoryImpl extends BaseRepositoryImpl<Diet, Integer> implements DietRepository {

    public DietRepositoryImpl(EntityManager em) {
        super(Diet.class,em);
    }

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Override
    public List<Diet> findAll() {
        return super.findAll();
    }

}
