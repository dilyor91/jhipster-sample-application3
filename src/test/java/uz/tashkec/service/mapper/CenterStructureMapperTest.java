package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CenterStructureMapperTest {

    private CenterStructureMapper centerStructureMapper;

    @BeforeEach
    public void setUp() {
        centerStructureMapper = new CenterStructureMapperImpl();
    }
}
