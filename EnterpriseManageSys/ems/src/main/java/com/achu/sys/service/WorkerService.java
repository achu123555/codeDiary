package com.achu.sys.service;

import com.achu.sys.pojo.Worker;

import java.util.List;


public interface WorkerService {
    List<Worker> getWorker();

    void addWorker(Worker worker);
}
