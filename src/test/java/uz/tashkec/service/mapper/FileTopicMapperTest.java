package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FileTopicMapperTest {

    private FileTopicMapper fileTopicMapper;

    @BeforeEach
    public void setUp() {
        fileTopicMapper = new FileTopicMapperImpl();
    }
}
