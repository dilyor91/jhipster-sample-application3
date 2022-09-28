package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.MaterialTopicLevel;

/**
 * Spring Data JPA repository for the MaterialTopicLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialTopicLevelRepository extends JpaRepository<MaterialTopicLevel, Long> {}
