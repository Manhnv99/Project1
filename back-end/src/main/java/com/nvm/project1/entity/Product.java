package com.nvm.project1.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String name;

    private Boolean gender;

    private String description;


    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;


    @ManyToOne
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;


    @ManyToOne
    @JoinColumn(name = "sole_id", referencedColumnName = "id")
    private Sole sole;


    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;


    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    private Long created_by;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    private Long updated_by;

}
