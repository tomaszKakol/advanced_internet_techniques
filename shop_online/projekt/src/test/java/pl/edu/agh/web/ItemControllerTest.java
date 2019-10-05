package pl.edu.agh.web;

import pl.edu.agh.web.app.Application;
import pl.edu.agh.dao.CategoryRepository;
import pl.edu.agh.dao.ItemRepository;
import pl.edu.agh.model.Category;
import pl.edu.agh.model.Item;
import net.minidev.json.JSONArray;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.isA;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class ItemControllerTest extends BaseTest {

    private Item item;

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ItemRepository itemRepository;

    @Before
    public void setUp() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
        Category harpCategory = new Category(1L, "harp");
        categoryRepository.save(harpCategory);
        itemRepository.save(new Item("Welsh harp", 2, harpCategory));
        itemRepository.save(new Item("Celtic harp", 2, harpCategory));
        item = itemRepository.findById(1L).orElse(null);
    }

    @Test
    public void testCRUD() throws Exception {
        test1_getItemDetail();
        test2_addItem();
        test3_updateItem();
        test4_getAll();
        test5_deleteItem();
    }

    private void test1_getItemDetail() throws Exception {
        mockMvc.perform(get("/item/" + item.getId())
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(item.getId().intValue())))
                .andExpect(jsonPath("$.name", is(item.getName())))
                .andExpect(jsonPath("$.quantity", is(item.getQuantity())))
                .andExpect(jsonPath("$.category.id", is(item.getCategory().getId().intValue())));
    }

    private void test2_addItem() throws Exception {
        mockMvc.perform(post("/item")
                .content(json(new Item("Wartburg harp", 10, new Category(1L))))
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Wartburg harp")))
                .andExpect(jsonPath("$.quantity", is(10)));
    }

    private void test3_updateItem() throws Exception {
        Item item = itemRepository.findById(1L).orElse(null);
        Item itemUpd = new Item(item.getName() + "updated", item.getQuantity(), new Category(item.getId()));
        itemUpd.setId(item.getId());

        mockMvc.perform(put("/item")
                .content(json(itemUpd))
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(item.getName() + "updated")))
                .andExpect(jsonPath("$.quantity", is(item.getQuantity())));
    }

    private void test4_getAll() throws Exception {
        mockMvc.perform(get("/item/list?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", isA(JSONArray.class)));
    }

    private void test5_deleteItem() throws Exception {
        mockMvc.perform(delete("/item/" + item.getId())
                .contentType(contentType))
                .andExpect(status().isOk());
    }

}
