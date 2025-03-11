package com.example.restservice.repository.medicin;

import com.example.restservice.models.medicin.Medicin;
import com.example.restservice.repository.common.BaseRepository;

import java.util.List;

public interface MedicinRepository extends BaseRepository<Medicin, Integer> {

    public List<Medicin> findAll();
    }
