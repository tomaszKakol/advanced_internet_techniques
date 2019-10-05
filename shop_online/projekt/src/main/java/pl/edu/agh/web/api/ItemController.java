package pl.edu.agh.web.api;

import pl.edu.agh.dao.CategoryRepository;
import pl.edu.agh.dao.ItemRepository;
import pl.edu.agh.model.Category;
import pl.edu.agh.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
public class ItemController {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ItemController(ItemRepository cartRepository, CategoryRepository categoryRepository) {
        this.itemRepository = cartRepository;
        this.categoryRepository = categoryRepository;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody Item item) {
        return saveItem(item);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody Item item) {
        if (itemRepository.findById(item.getId()).orElse(null) != null) {
            return saveItem(item);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<Page> list(Pageable pageable) {
        return new ResponseEntity<>(this.itemRepository.findAll(pageable), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/{itemId}", method = RequestMethod.GET)
    public ResponseEntity<Item> getById(@PathVariable Long itemId) {
        return  new ResponseEntity<>(itemRepository.findById(itemId).orElse(null), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/{itemId}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable Long itemId) {
        itemRepository.deleteById(itemId);
        return ResponseEntity.ok().build();
    }

    private ResponseEntity<?> saveItem(Item item) {
        // Fetch item category from id
        Category category = this.categoryRepository.findById(item.getCategory().getId()).orElse(null);

        if (category == null)
            return ResponseEntity.noContent().build();

        // Save item
        item.setCategory(category);
        return new ResponseEntity<>(itemRepository.save(item), HttpStatus.OK);
    }
}
