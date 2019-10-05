package pl.edu.agh.project;

import javax.persistence.*;

@Entity
@Table(name = "TEST_ENTITY")
public class TestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

}
