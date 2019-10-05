package pl.edu.agh.core;

import pl.edu.agh.project.ProjectApplication;
import pl.edu.agh.web.api.ItemController;
import pl.edu.agh.web.config.DatabaseConfig;
import pl.edu.agh.dao.CategoryRepository;
import pl.edu.agh.dao.ItemRepository;
import pl.edu.agh.model.Category;
import pl.edu.agh.model.Item;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import static org.assertj.core.api.Assertions.*;

import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.junit.Assert.*;

@Configuration
@Import({DatabaseConfig.class})
@PropertySource("classpath:application.properties")
@PropertySource("classpath:database.properties")
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectApplication.class)
public class CartRepositoryTest {

	@Autowired
	ItemController itemController;
	
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    CategoryRepository categoryRepository;

    public static final String BabyGrand = "Baby grand";

    @Test
    public void getOneItem() throws Exception {
        Item one = itemRepository.findById(1L).orElse(null);
        assertNotNull(one);
    }
    
    @Test
    public void createItem() throws Exception {
    	
        Optional<Category> piano =
                StreamSupport.stream(categoryRepository.findAll().spliterator(), false).
                        filter(category -> category.getName().equals("Piano")).findFirst();
        assertNotNull(piano.get());
	
        itemRepository.save(new Item(BabyGrand, 3, piano.get()));
        
        assertNotNull(itemRepository.findByname(BabyGrand));
    }

    @Test
    public void updateItem() throws Exception {
        Item one = itemRepository.findById(1L).orElse(null);
        assertNotNull(one);
        one.setName(one.getName() + "updated");
        itemRepository.save(one);
        Item updated = itemRepository.findById(1L).orElse(null);
        assertEquals(one.getName(), updated.getName());
    }

    @Test
    public void deleteItem() throws Exception {
        itemRepository.deleteById(2L);
        assertNull(itemRepository.findById(2L).orElse(null));
    }

    @Test
    public void getByPage() throws Exception {
        Page<Item> pageOne = itemRepository.findAll(PageRequest.of(1, 10));
        assertThat(pageOne.getTotalElements()).isGreaterThan(0);
    }
}
