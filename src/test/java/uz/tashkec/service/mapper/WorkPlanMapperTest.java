package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WorkPlanMapperTest {

    private WorkPlanMapper workPlanMapper;

    @BeforeEach
    public void setUp() {
        workPlanMapper = new WorkPlanMapperImpl();
    }
}
