package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.MaterialTopic;

/**
 * Spring Data JPA repository for the MaterialTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialTopicRepository extends JpaRepository<MaterialTopic, Long> {}
