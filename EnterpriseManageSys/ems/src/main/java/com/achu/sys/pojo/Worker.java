package com.achu.sys.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Worker {
    private Integer id;
    private String name;
    private Integer gender;
    private String position;
    private LocalDate entryDate;
    private LocalDateTime updateTime;
    private Integer deptId;
}
