package com.example.restservice.dto;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.models.medicin.Medicin;
import com.example.restservice.models.reports.Report;

import java.util.List;

public class ReportDTO {
    List<String> allergies;
    List<String> disabilities;

    List<Diet> diets;
    List<Medicin> medicins;
    Report report;

    public ReportDTO(List<String> allergies, Report report) {
        this.allergies = allergies;
        this.report = report;
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public List<String> getDisabilities() {
        return disabilities;
    }

    public void setDisabilities(List<String> disabilities) {
        this.disabilities = disabilities;
    }

    public List<Diet> getDiets() {
        return diets;
    }

    public void setDiets(List<Diet> diets) {
        this.diets = diets;
    }

    public List<Medicin> getMedicins() {
        return medicins;
    }

    public void setMedicins(List<Medicin> medicins) {
        this.medicins = medicins;
    }
}
