package com.example.restservice.repository.medicin;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.models.medicin.Medicin;
import com.example.restservice.repository.common.BaseRepositoryImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;

import java.util.List;


public class MedicinRepositoryImpl extends BaseRepositoryImpl<Medicin, Integer> implements MedicinRepository {

    public MedicinRepositoryImpl(EntityManager em) {
        super(Medicin.class,em);
    }

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Override
    public List<Medicin> findAll() {
        return super.findAll();
    }


    public List<Medicin> getMedicinByReportID(Integer reportid) {
        return (List<Medicin>) queryFactory.selectFrom(medicin)
                .where(medicin.report_medicin.eq(reportid))
                .fetch();
    }

}
