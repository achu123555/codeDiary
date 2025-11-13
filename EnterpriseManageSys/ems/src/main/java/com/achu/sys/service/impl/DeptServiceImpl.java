package com.achu.sys.service.impl;
import com.achu.sys.service.DeptService;
import com.achu.sys.mapper.DeptMapper;
import com.achu.sys.pojo.Dept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptMapper deptMapper;
    /**
     * 1.3 查询所有部门信息
     * @return
     */
    @Override
    public List<Dept> getList() {
        return deptMapper.getList();
    }

    @Override
    public void deleteDept(Integer id){
        deptMapper.deleteDept(id);
    }

    @Override
    public void addDept(Dept dept){
        dept.setCreateTime(LocalDateTime.now());
        dept.setUpdateTime(LocalDateTime.now());
        deptMapper.addDept(dept);
    }

    @Override
    public Dept getById(Integer id){
        Dept dept = deptMapper.getById(id);
        return dept;
    }

    @Override
    public void updateDept(Dept dept){
        dept.setUpdateTime(LocalDateTime.now());
        deptMapper.updateDept(dept);
    }
}
