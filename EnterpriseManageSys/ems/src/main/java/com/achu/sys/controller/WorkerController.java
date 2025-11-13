package com.achu.sys.controller;

import com.achu.sys.pojo.Response;
import com.achu.sys.pojo.Worker;
import com.achu.sys.service.WorkerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500"})
@Slf4j
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    /**
     *  1.查
     * @return
     */
    @GetMapping("/emp")
    public Response getWorker(){
        List<Worker> workerList = workerService.getWorker();
        return Response.success(workerList);
    }

    /**
     *  2.增
     * @param worker
     * @return
     */
    @PostMapping("/emp")
    public Response addWorker(@RequestBody Worker worker){
        try {
            log.info("添加的员工数据:{}",worker);
            workerService.addWorker(worker);
        } catch (Exception e) {
            log.info("添加员工数据异常:{}",e.getMessage());
            throw new RuntimeException(e);
        }
        return Response.success();
    }
}
