package com.achu.sys.mapper;

import com.achu.sys.pojo.Worker;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WorkerMapper {

    @Select("select emp.*,dept.name from emp,dept where emp.dept_id = dept.id order by entry_date desc")
    List<Worker> getWorker();

    @Insert("insert into emp (id,name,gender,position,entry_date,update_time,dept_id)" +
            " values (#{id},#{name},#{gender},#{position},#{entryDate},#{updateTime},#{deptId})")
    void addWorker(Worker worker);
}
