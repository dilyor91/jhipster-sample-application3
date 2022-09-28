package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PopupMapperTest {

    private PopupMapper popupMapper;

    @BeforeEach
    public void setUp() {
        popupMapper = new PopupMapperImpl();
    }
}
