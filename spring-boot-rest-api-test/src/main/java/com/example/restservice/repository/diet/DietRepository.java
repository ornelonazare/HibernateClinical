package com.example.restservice.repository.diet;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.models.reports.Report;
import com.example.restservice.repository.common.BaseRepository;

import java.util.List;

public interface DietRepository  extends BaseRepository<Diet, Integer> {

    public List<Diet> findAll();
    public List<Diet> getDietsByReportID(Integer reportid);
}
