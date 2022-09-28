package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.WorkPlan;

/**
 * Spring Data JPA repository for the WorkPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkPlanRepository extends JpaRepository<WorkPlan, Long> {}
