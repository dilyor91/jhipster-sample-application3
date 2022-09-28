package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MaterialTopicMapperTest {

    private MaterialTopicMapper materialTopicMapper;

    @BeforeEach
    public void setUp() {
        materialTopicMapper = new MaterialTopicMapperImpl();
    }
}
