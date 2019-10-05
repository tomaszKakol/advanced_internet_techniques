package pl.edu.agh.dao;

import pl.edu.agh.model.Item;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    Item findByname(String name);
}
