package pl.edu.agh.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Item implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S_ITEM")
    @SequenceGenerator(sequenceName = "S_ITEM", allocationSize = 1, name = "S_ITEM")
    Long id;
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAT_ID")
    Category category;

    public Item() {
    }

    public Item(String name, Integer quantity, Category category) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
