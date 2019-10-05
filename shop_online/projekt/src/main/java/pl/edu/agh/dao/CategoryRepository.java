package pl.edu.agh.dao;

import pl.edu.agh.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
