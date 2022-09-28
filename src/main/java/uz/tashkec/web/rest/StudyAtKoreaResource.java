package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.StudyAtKoreaRepository;
import uz.tashkec.service.StudyAtKoreaService;
import uz.tashkec.service.dto.StudyAtKoreaDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.StudyAtKorea}.
 */
@RestController
@RequestMapping("/api")
public class StudyAtKoreaResource {

    private final Logger log = LoggerFactory.getLogger(StudyAtKoreaResource.class);

    private static final String ENTITY_NAME = "studyAtKorea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudyAtKoreaService studyAtKoreaService;

    private final StudyAtKoreaRepository studyAtKoreaRepository;

    public StudyAtKoreaResource(StudyAtKoreaService studyAtKoreaService, StudyAtKoreaRepository studyAtKoreaRepository) {
        this.studyAtKoreaService = studyAtKoreaService;
        this.studyAtKoreaRepository = studyAtKoreaRepository;
    }

    /**
     * {@code POST  /study-at-koreas} : Create a new studyAtKorea.
     *
     * @param studyAtKoreaDTO the studyAtKoreaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studyAtKoreaDTO, or with status {@code 400 (Bad Request)} if the studyAtKorea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/study-at-koreas")
    public ResponseEntity<StudyAtKoreaDTO> createStudyAtKorea(@RequestBody StudyAtKoreaDTO studyAtKoreaDTO) throws URISyntaxException {
        log.debug("REST request to save StudyAtKorea : {}", studyAtKoreaDTO);
        if (studyAtKoreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new studyAtKorea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudyAtKoreaDTO result = studyAtKoreaService.save(studyAtKoreaDTO);
        return ResponseEntity
            .created(new URI("/api/study-at-koreas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /study-at-koreas/:id} : Updates an existing studyAtKorea.
     *
     * @param id the id of the studyAtKoreaDTO to save.
     * @param studyAtKoreaDTO the studyAtKoreaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyAtKoreaDTO,
     * or with status {@code 400 (Bad Request)} if the studyAtKoreaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studyAtKoreaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/study-at-koreas/{id}")
    public ResponseEntity<StudyAtKoreaDTO> updateStudyAtKorea(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudyAtKoreaDTO studyAtKoreaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudyAtKorea : {}, {}", id, studyAtKoreaDTO);
        if (studyAtKoreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyAtKoreaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyAtKoreaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StudyAtKoreaDTO result = studyAtKoreaService.update(studyAtKoreaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyAtKoreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /study-at-koreas/:id} : Partial updates given fields of an existing studyAtKorea, field will ignore if it is null
     *
     * @param id the id of the studyAtKoreaDTO to save.
     * @param studyAtKoreaDTO the studyAtKoreaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyAtKoreaDTO,
     * or with status {@code 400 (Bad Request)} if the studyAtKoreaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studyAtKoreaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studyAtKoreaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/study-at-koreas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudyAtKoreaDTO> partialUpdateStudyAtKorea(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudyAtKoreaDTO studyAtKoreaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudyAtKorea partially : {}, {}", id, studyAtKoreaDTO);
        if (studyAtKoreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyAtKoreaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyAtKoreaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudyAtKoreaDTO> result = studyAtKoreaService.partialUpdate(studyAtKoreaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyAtKoreaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /study-at-koreas} : get all the studyAtKoreas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studyAtKoreas in body.
     */
    @GetMapping("/study-at-koreas")
    public List<StudyAtKoreaDTO> getAllStudyAtKoreas() {
        log.debug("REST request to get all StudyAtKoreas");
        return studyAtKoreaService.findAll();
    }

    /**
     * {@code GET  /study-at-koreas/:id} : get the "id" studyAtKorea.
     *
     * @param id the id of the studyAtKoreaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studyAtKoreaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/study-at-koreas/{id}")
    public ResponseEntity<StudyAtKoreaDTO> getStudyAtKorea(@PathVariable Long id) {
        log.debug("REST request to get StudyAtKorea : {}", id);
        Optional<StudyAtKoreaDTO> studyAtKoreaDTO = studyAtKoreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studyAtKoreaDTO);
    }

    /**
     * {@code DELETE  /study-at-koreas/:id} : delete the "id" studyAtKorea.
     *
     * @param id the id of the studyAtKoreaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/study-at-koreas/{id}")
    public ResponseEntity<Void> deleteStudyAtKorea(@PathVariable Long id) {
        log.debug("REST request to delete StudyAtKorea : {}", id);
        studyAtKoreaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
