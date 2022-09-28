package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.FileTopic;

/**
 * Spring Data JPA repository for the FileTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileTopicRepository extends JpaRepository<FileTopic, Long> {}
