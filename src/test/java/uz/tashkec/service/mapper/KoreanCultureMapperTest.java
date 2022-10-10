package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class KoreanCultureMapperTest {

    private KoreanCultureMapper koreanCultureMapper;

    @BeforeEach
    public void setUp() {
        koreanCultureMapper = new KoreanCultureMapperImpl();
    }
}
