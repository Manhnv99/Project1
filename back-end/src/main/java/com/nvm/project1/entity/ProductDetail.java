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
@Table(name = "product_detail")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private Long quantity;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "size_id",referencedColumnName = "id")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "color_id",referencedColumnName = "id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "status_id",referencedColumnName = "id")
    private StatusProductDetail status;


    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    private Long created_by;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

    private Long updated_by;

}
