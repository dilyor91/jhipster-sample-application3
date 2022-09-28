package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GreetingMapperTest {

    private GreetingMapper greetingMapper;

    @BeforeEach
    public void setUp() {
        greetingMapper = new GreetingMapperImpl();
    }
}
