package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OurHistoryMapperTest {

    private OurHistoryMapper ourHistoryMapper;

    @BeforeEach
    public void setUp() {
        ourHistoryMapper = new OurHistoryMapperImpl();
    }
}
