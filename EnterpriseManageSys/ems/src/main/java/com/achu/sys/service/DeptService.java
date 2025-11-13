package com.achu.sys.service;

import com.achu.sys.pojo.Dept;

import java.util.List;


public interface DeptService {
    /**
     * 1.2 查询所有部门信息
     * @return
     */
    List<Dept> getList();

    void deleteDept(Integer id);

    void addDept(Dept dept);

    Dept getById(Integer id);

    void updateDept(Dept dept);
}