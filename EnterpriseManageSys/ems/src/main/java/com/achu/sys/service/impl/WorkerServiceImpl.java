package com.achu.sys.service.impl;

import com.achu.sys.mapper.WorkerMapper;
import com.achu.sys.pojo.Worker;
import com.achu.sys.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerServiceImpl implements WorkerService {
    @Autowired
    private WorkerMapper workerMapper;

    /**
     * 展示数据
     * @return List<Worker>
     */
    @Override
    public List<Worker> getWorker(){
        return workerMapper.getWorker();
    }

    /**
     * 增加数据
     * @param worker
     */
    @Override
    public void addWorker(Worker worker){

        workerMapper.addWorker(worker);
    }
}
