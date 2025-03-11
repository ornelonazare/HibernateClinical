package com.example.restservice.repository.item;

import com.example.restservice.models.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
